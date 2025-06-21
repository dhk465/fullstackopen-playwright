class BlogPage {
  constructor(page) {
    this.page = page;
    this.url = '/blog';
    this.logoutButton = page.getByTestId('logout-button');
    this.getBlogPosts = page.getByTestId('blog-posts');
  }

  async navigate() {
    await this.page.goto('/');
  }

  async getBlogPosts() {
    return this.page.locator('.blog');
  }

  async isBlogPostsVisible() {
    return this.getBlogPosts.isVisible();
  }

  async showDetails(blogPost) {
    await blogPost.getByRole('button', { name: 'view' }).click();
  }

  async likeBlog(blogPost) {
    await blogPost.getByRole('button', { name: 'like' }).click();
  }

  async removeBlog(blogPost) {
    await blogPost.getByRole('button', { name: 'remove' }).click();
  }

  async createBlog({ title, author, url }) {
    await this.page.getByPlaceholder('Title').fill(title);
    await this.page.getByPlaceholder('Author').fill(author);
    await this.page.getByPlaceholder('Url').fill(url);
    await this.page.getByRole('button', { name: 'create' }).click();
  }

  async isNotificationVisible() {
    // Check if notification element is visible using locator
    const notification = this.page.locator('.notification');
    return await notification.isVisible();
  }

  async getNotificationText() {
    // Get the text content of the notification using locator
    const notification = this.page.locator('.notification');
    return await notification.textContent() ?? '';
  }

  async logout() {
    // Click the logout button
    await this.page.getByRole('button', { name: 'logout' }).click();
  }
}

module.exports = BlogPage;
