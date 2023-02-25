import useHttp from '../hooks/http.hook';

const useMarvelService = () => {
	const { loading, error, request, clearError } = useHttp();

	const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
	const _apiKey = 'apikey=ffd359f80571828b4f13d3404b0dd890';
	const _baseOffset = 210;

	const getAllCharacters = async (offset = _baseOffset) => {
		const res = await request(
			`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`,
		);

		return res.data.results.map(_transfromCharacter);
	};

	const getCharacter = async (id) => {
		const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);

		return _transfromCharacter(res.data.results[0]);
	};

	const getAllComics = async (offset = _baseOffset) => {
		const res = await request(
			`${_apiBase}comics?limit=12&offset=${offset}&${_apiKey}`,
		);

		return res.data.results.map(_trasformfromComics);
	};

	const _transfromCharacter = (char) => {
		return {
			id: char.id,
			name: char.name,
			description: char.description
				? `${char.description.slice(0, 210)}...`
				: 'There is no description for this character',
			thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items,
		};
	};

	const _trasformfromComics = (comics) => {
		return {
			id: comics.id,
			name: comics.title,
			thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
			price: comics.prices[0].price,
		};
	};

	return {
		loading,
		error,
		clearError,
		getAllCharacters,
		getCharacter,
		getAllComics,
	};
};

export default useMarvelService;
