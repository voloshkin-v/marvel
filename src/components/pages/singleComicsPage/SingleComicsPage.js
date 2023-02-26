import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';

import useMarvelService from '../../../services/MarvelService';

import './singleComicPage.scss';

const SingleComicsPage = () => {
	const { id } = useParams();
	const { error, loading, getComics, clearError } = useMarvelService();
	const [comics, setComics] = useState({});

	useEffect(() => {
		updateComics();
	}, [id]);

	const updateComics = () => {
		clearError();

		getComics(id).then(onComicsLoaded);
	};

	const onComicsLoaded = (comics) => {
		setComics(comics);
	};

	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading && !error ? <Spinner /> : null;
	const content = !(loading || error || !comics) ? (
		<View comics={comics} />
	) : null;

	return (
		<>
			{errorMessage}
			{spinner}
			{content}
		</>
	);
};

const View = ({ comics }) => {
	const { name, thumbnail, description, pageCount, price, language } = comics;
	console.log(price);

	return (
		<div className="single-comic">
			<img src={thumbnail} alt={name} className="single-comic__img" />
			<div className="single-comic__info">
				<h2 className="single-comic__name">{name}</h2>
				<p className="single-comic__descr">{description}</p>
				<p className="single-comic__descr">Pages: {pageCount}</p>
				<p className="single-comic__descr">Language: {language}</p>
				<div className="single-comic__price">{price}</div>
			</div>
			<Link to="/comics" className="single-comic__back">
				Back to all
			</Link>
		</div>
	);
};

export default SingleComicsPage;
