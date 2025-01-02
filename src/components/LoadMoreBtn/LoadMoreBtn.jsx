import css from './LoadMoreBtn.module.css';

export default function LoadMoreBtn({ onClick }) {
  return (
    <div>
      <button className={css.btnLoad} onClick={onClick}>
        Load more
      </button>
    </div>
  );
}
