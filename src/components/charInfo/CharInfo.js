import { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import useMarvelService from '../../services/MarvelService';

import './charInfo.scss';

const CharInfo = (props) => {
	const [char, setChar] = useState(null);
	const { error, loading, getCharacter, clearError } = useMarvelService();

	useEffect(() => {
		updateChar();
	}, [props.selectedCharId]);

	const updateChar = () => {
		const { selectedCharId } = props;

		if (!selectedCharId) {
			return;
		}

		clearError();
		getCharacter(selectedCharId).then(onCharLoaded);
	};

	const onCharLoaded = (char) => {
		setChar(char);
	};

	const skeleton = char || loading || error ? null : <Skeleton />;
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading && !error ? <Spinner /> : null;
	const content = !(loading || error || !char) ? <View char={char} /> : null;

	return (
		<div className="char__info">
			{skeleton}
			{errorMessage}
			{spinner}
			{content}
		</div>
	);
};

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki, comics } = char;

	let imgStyle = { objectFit: 'cover' };

	if (
		thumbnail ===
		'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
	) {
		imgStyle = { objectFit: 'contain' };
	}

	return (
		<>
			<div className="char__basics">
				<img style={imgStyle} src={thumbnail} alt={name} />

				<div>
					<div className="char__info-name">{name}</div>

					<div className="char__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">Homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>

			<div className="char__descr">{description}</div>

			<div className="char__comics">Comics:</div>

			<ul className="char__comics-list">
				{comics.length > 0 ? null : 'There are no comics.'}

				{comics.map(({ name }, i) => {
					// eslint-disable-next-line
					if (i > 9) return;

					return (
						<li key={i} className="char__comics-item">
							{name}
						</li>
					);
				})}
			</ul>
		</>
	);
};

export default CharInfo;
