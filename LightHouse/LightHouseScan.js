const lighthouse = require('lighthouse').default || require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Base URL of your site
const baseUrl = 'https://uwctf.ca';

// Fetch and parse robots.txt or sitemap
async function fetchUrls(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function getUrlsFromRobotsTxt(baseUrl) {
  console.log('Fetching robots.txt...');
  const robotsUrl = `${baseUrl}/robots.txt`;
  
  try {
    const robotsTxt = await fetchUrls(robotsUrl);
    const urls = new Set();
    urls.add(baseUrl); // Always include homepage
    
    // Look for Sitemap in robots.txt
    const sitemapMatches = robotsTxt.match(/Sitemap:\s*(.+)/gi);
    
    if (sitemapMatches) {
      for (const match of sitemapMatches) {
        const sitemapUrl = match.replace(/Sitemap:\s*/i, '').trim();
        console.log(`Found sitemap: ${sitemapUrl}`);
        const sitemapUrls = await getUrlsFromSitemap(sitemapUrl);
        sitemapUrls.forEach(url => urls.add(url));
      }
    }
    
    // Also parse Allow/Disallow rules to find mentioned paths
    const lines = robotsTxt.split('\n');
    for (const line of lines) {
      const allowMatch = line.match(/^Allow:\s*(.+)/i);
      if (allowMatch) {
        const path = allowMatch[1].trim();
        if (path !== '/' && !path.includes('*')) {
          urls.add(`${baseUrl}${path}`);
        }
      }
    }
    
    return Array.from(urls);
  } catch (error) {
    console.error('Could not fetch robots.txt:', error.message);
    return [baseUrl];
  }
}

async function getUrlsFromSitemap(sitemapUrl) {
  try {
    const sitemap = await fetchUrls(sitemapUrl);
    const urls = new Set();
    
    // Parse XML sitemap for <loc> tags
    const locMatches = sitemap.match(/<loc>(.+?)<\/loc>/g);
    
    if (locMatches) {
      locMatches.forEach(match => {
        const url = match.replace(/<\/?loc>/g, '').trim();
        urls.add(url);
      });
    }
    
    return Array.from(urls);
  } catch (error) {
    console.error('Could not fetch sitemap:', error.message);
    return [];
  }
}

// Configuration for Lighthouse
const lighthouseConfig = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  },
};

async function scanMultiplePages() {
  // Get URLs from robots.txt/sitemap
  const urlsToScan = await getUrlsFromRobotsTxt(baseUrl);
  
  console.log(`\nFound ${urlsToScan.length} URLs to scan:`);
  urlsToScan.forEach(url => console.log(`  - ${url}`));
  console.log('');
  
  // Create reports directory if it doesn't exist
  const reportsDir = './lighthouse-reports';
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir);
  }

  // Launch Chrome
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  
  const results = [];
  
  for (let i = 0; i < urlsToScan.length; i++) {
    const url = urlsToScan[i];
    console.log(`\nScanning [${i + 1}/${urlsToScan.length}]: ${url}`);
    
    try {
      const runnerResult = await lighthouse(url, {
        port: chrome.port,
        output: ['html', 'json'],
        logLevel: 'info',
      }, lighthouseConfig);

      // Save HTML report
      const sanitizedUrl = url.replace(/https?:\/\//, '').replace(/\//g, '_');
      const htmlPath = path.join(reportsDir, `${sanitizedUrl}.html`);
      fs.writeFileSync(htmlPath, runnerResult.report[0]);

      // Save JSON report
      const jsonPath = path.join(reportsDir, `${sanitizedUrl}.json`);
      fs.writeFileSync(jsonPath, runnerResult.report[1]);

      // Collect summary data
      const scores = {
        url: url,
        performance: Math.round(runnerResult.lhr.categories.performance.score * 100),
        accessibility: Math.round(runnerResult.lhr.categories.accessibility.score * 100),
        bestPractices: Math.round(runnerResult.lhr.categories['best-practices'].score * 100),
        seo: Math.round(runnerResult.lhr.categories.seo.score * 100),
      };
      
      results.push(scores);
      
      console.log(`✓ Completed: ${url}`);
      console.log(`  Performance: ${scores.performance}`);
      console.log(`  Accessibility: ${scores.accessibility}`);
      console.log(`  Best Practices: ${scores.bestPractices}`);
      console.log(`  SEO: ${scores.seo}`);
      
    } catch (error) {
      console.error(`✗ Failed to scan ${url}:`, error.message);
      results.push({
        url: url,
        error: error.message
      });
    }
  }

  await chrome.kill();

  // Generate summary report
  console.log('\n=== SUMMARY ===');
  console.table(results);
  
  // Save summary as JSON
  fs.writeFileSync(
    path.join(reportsDir, 'summary.json'),
    JSON.stringify(results, null, 2)
  );
  
  console.log(`\nAll reports saved to: ${reportsDir}`);
}

// Run the scanner
scanMultiplePages().catch(console.error);