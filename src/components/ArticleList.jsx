import Card from "./Card";

function ArticleList({ data, published }) {
  const filteredData = data.filter((post) => post.published === published);
  return (
    <main>
      <h1>Content goes here</h1>
      {data &&
        filteredData.length > 0 &&
        filteredData.map((post) => {
          return <Card cardInfo={post} key={post.id} />;
        })}
    </main>
  );
}

export default ArticleList;
