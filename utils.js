// Helper function to filter posts by date range
export function filterPostsByDate(posts, startDate, endDate) {
  return posts.filter(post => {
    const postDate = new Date(post.date);
    return postDate >= new Date(startDate) && postDate <= new Date(endDate);
  });
}

// Helper function to check for violations in a post
export function checkForViolations(content, terms) {
  return terms.filter(term => content.includes(term));
}
