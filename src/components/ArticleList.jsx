import Card from "./Card";

function ArticleList({ data, draft }) {
  const filteredData = data.filter((post) => post.published === draft);
  return (
    <main>
      <h1>Content goes here</h1>
      {data &&
        filteredData.length > 0 &&
        filteredData.map((post) => {
          return <Card cardInfo={post} />;
        })}
    </main>
  );
}

export default ArticleList;
