module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('css');
  eleventyConfig.addPassthroughCopy('js');
  eleventyConfig.addPassthroughCopy('i');
  eleventyConfig.addPassthroughCopy('font');
  eleventyConfig.addPassthroughCopy('steam');
  eleventyConfig.addPassthroughCopy('demos');

  return {
    passthroughFileCopy: true
  };
};
