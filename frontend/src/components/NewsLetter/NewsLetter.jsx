import "./NewsLetter.css";
const NewsLetter = () => {
  return (
    <div className="news-letter container">
      <h2>News Letter</h2>
      <p>get emails about new releases</p>
      <form action="">
        <input type="text" placeholder="Email" />
        <button>Subscribe</button>
      </form>
    </div>
  );
};

export default NewsLetter;
