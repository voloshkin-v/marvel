import { useState, useEffect, useRef } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

const ComicsList = () => {
	const [comicsList, setComicsList] = useState([]);
	const [newItemsLoading, setNewItemsLoading] = useState(false);
	const [offset, setOffset] = useState(210);
	const [comicsEnded, setComicsEnded] = useState(false);

	const { loading, error, getAllComics } = useMarvelService();

	useEffect(() => {
		onRequest(offset, true);
	}, []);

	const onRequest = (offset, initial) => {
		initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
		getAllComics(offset).then(onComicsListLoaded);
	};

	const onComicsListLoaded = (newComicsList) => {
		let ended = false;

		if (newComicsList.length < 9) {
			ended = true;
		}

		setComicsList((comicsList) => [...comicsList, ...newComicsList]);
		setNewItemsLoading(false);
		setOffset((offset) => offset + 9);
		setComicsEnded(ended);
	};

	const itemRefs = useRef([]);

	function renderItems(arr) {
		const items = arr.map(({ id, thumbnail, name, price }, i) => {
			let imgStyle = { objectFit: 'cover' };

			if (
				thumbnail ===
				'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
			) {
				imgStyle = { objectFit: 'unset' };
			}

			return (
				<li className="comics__item" key={id}>
					<a href="##">
						<img
							src={thumbnail}
							alt={name}
							style={imgStyle}
							className="comics__item-img"
						/>
						<div className="comics__item-name">{name}</div>
						<div className="comics__item-price">{price} $</div>
					</a>
				</li>
			);
		});

		return <ul className="comics__grid">{items}</ul>;
	}

	const items = renderItems(comicsList);
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading && !error && !newItemsLoading ? <Spinner /> : null;

	return (
		<div className="comics__list">
			{errorMessage}
			{spinner}
			{items}

			<button
				className="button button__main button__long"
				onClick={() => onRequest(offset)}
				disabled={newItemsLoading}
				style={comicsEnded ? { display: 'none' } : {}}>
				<div className="inner">load more</div>
			</button>
		</div>
	);
};

export default ComicsList;
