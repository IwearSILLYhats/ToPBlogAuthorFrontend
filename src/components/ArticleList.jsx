function ArticleList({ loading, error, data }) {
  return (
    <main>
      <h1>Content goes here</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>{data.message}</p>}
    </main>
  );
}

export default ArticleList;
