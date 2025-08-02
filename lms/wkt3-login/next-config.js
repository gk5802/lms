let JavaScriptObfuscator;
let fs;
let path;
(async () => {
  JavaScriptObfuscator = (await import("javascript-obfuscator")).default;
  fs = (await import("fs")).default || (await import("fs"));
  path = (await import("path")).default || (await import("path"));
})();

// Custom obfuscation step
function obfuscateJS(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      obfuscateJS(fullPath);
    } else if (file.endsWith(".js")) {
      const code = fs.readFileSync(fullPath, "utf8");
      const obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
        compact: true,
        controlFlowFlattening: true,
      }).getObfuscatedCode();
      fs.writeFileSync(fullPath, obfuscatedCode);
    }
  }
}

// In your next.config.js export:
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push({
        apply: (compiler) => {
          compiler.hooks.afterEmit.tap("ObfuscateJS", () => {
            obfuscateJS(path.resolve(__dirname, ".next/static/chunks"));
          });
        },
      });
    }
    return config;
  },
};
