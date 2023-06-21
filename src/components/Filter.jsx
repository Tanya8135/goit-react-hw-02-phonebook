import style from './App.module.css';

const Filter = ({ filter, onChange }) => (
  <label className={style.subTitle}>
    Find contacts by name
    <input
      className={style.input}
      type="text"
      name="filter"
      value={filter}
      onChange={onChange}
    />
  </label>
);

export default Filter;
