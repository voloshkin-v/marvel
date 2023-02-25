import { useState, useEffect, useRef } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = (props) => {
	const [charList, setCharList] = useState([]);
	const [newItemsLoading, setNewItemsLoading] = useState(false);
	const [offset, setOffset] = useState(210);
	const [charEnded, setCharEnded] = useState(false);

	const { loading, error, getAllCharacters } = useMarvelService();

	useEffect(() => {
		onRequest(offset, true);
	}, []);

	const onRequest = (offset, initial) => {
		initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
		getAllCharacters(offset).then(onCharListLoaded);
	};

	const onCharListLoaded = (newCharList) => {
		let ended = false;

		if (newCharList.length < 9) {
			ended = true;
		}

		setCharList((charList) => [...charList, ...newCharList]);
		setNewItemsLoading(false);
		setOffset((offset) => offset + 9);
		setCharEnded(ended);
	};

	const itemRefs = useRef([]);

	const focusOnItem = (id) => {
		itemRefs.current.forEach((item) =>
			item.classList.remove('char__item_selected'),
		);

		itemRefs.current[id].classList.add('char__item_selected');
		itemRefs.current[id].focus();
	};

	function renderItems(arr) {
		const items = arr.map(({ id, thumbnail, name }, i) => {
			let imgStyle = { objectFit: 'cover' };

			if (
				thumbnail ===
				'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
			) {
				imgStyle = { objectFit: 'unset' };
			}

			return (
				<li
					tabIndex={0}
					ref={(el) => (itemRefs.current[i] = el)}
					className="char__item"
					key={id}
					onClick={() => {
						props.onCharSelected(id);
						focusOnItem(i);
					}}
					onKeyDown={(e) => {
						if (e.key === ' ' || e.key === 'Enter') {
							props.onCharSelected(id);
							focusOnItem(i);
						}
					}}>
					<img src={thumbnail} alt={name} style={imgStyle} />
					<div className="char__name">{name}</div>
				</li>
			);
		});

		return <ul className="char__grid">{items}</ul>;
	}

	const items = renderItems(charList);
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading && !error && !newItemsLoading ? <Spinner /> : null;

	return (
		<div className="char__list">
			{errorMessage}
			{spinner}
			{items}

			<button
				onClick={() => onRequest(offset)}
				className="button button__main button__long"
				disabled={newItemsLoading}
				style={charEnded ? { display: 'none' } : {}}>
				<div className="inner">load more</div>
			</button>
		</div>
	);
};

export default CharList;
