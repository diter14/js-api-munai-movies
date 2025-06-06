import { api } from '../services/theMovieDBApi';
import { state } from '../store/state';
import { $id } from '../utils';

const HomePage = async () => {
  console.log('HomePage');
  const homePageSectionsContainer = $id('home-page-section');
  const categoriesPageSectionsContainer = $id('categories-page-section');
  const searchPageSectionsContainer = $id('search-page-section');
  homePageSectionsContainer.style.display = 'block';
  categoriesPageSectionsContainer.style.display = 'none'; 
  searchPageSectionsContainer.style.display = 'none'; 
  
  await renderTrendingMovies();
  await renderOnPremiereMovies();
  await renderMoviesGenresButtons();
}

const TrendsPage = () => {
  console.log('TrendsPage');
}

const SearchPage = () => {
  console.log('SearchPage');
  let [ searchHash, searchText ] = window.location.hash.split('=');
  console.log(searchText);
  
  const homePageSectionsContainer = $id('home-page-section');
  const categoriesPageSectionsContainer = $id('categories-page-section');
  const searchPageSectionsContainer = $id('search-page-section');
  homePageSectionsContainer.style.display = 'none';
  categoriesPageSectionsContainer.style.display = 'none'; 
  searchPageSectionsContainer.style.display = 'block'; 

  renderMoviesByQuerySearch({
    movieQuery: searchText
  })
}

const MovieDetailsPage = () => {
  console.log('MovieDetailsPage');
}

const CategoriesPage = () => {
  console.log('CategoriesPage');
  let [ genreHash, genreData ] = window.location.hash.split('=');
  let [ genreId, genreName ] = genreData.split('-');

  const homePageSectionsContainer = $id('home-page-section');
  const categoriesPageSectionsContainer = $id('categories-page-section');
  const searchPageSectionsContainer = $id('search-page-section');
  homePageSectionsContainer.style.display = 'none';
  categoriesPageSectionsContainer.style.display = 'block'; 
  searchPageSectionsContainer.style.display = 'none'; 

  renderMoviesByGenres({ genreId, genreName });
}

const renderMoviesCards = async({movies, cardArticleName, cardContainerElement, cardPosterSize, cardPosterClasses, cardPosterWidth}) => {
  try {    
    movies.forEach(movie => {
      const movieArticle = document.createElement('article');
      movieArticle.id = `${cardArticleName}-${movie.id}`;
      movieArticle.style.minWidth = cardPosterWidth ?? '150px';
      movieArticle.style.width = cardPosterWidth ?? '150px';
      movieArticle.classList.add('rounded-md', 'overflow-hidden', 'relative');
      
      const movieImgPoster = document.createElement('img');
      movieImgPoster.src = `https://image.tmdb.org/t/p/${cardPosterSize ?? 'w300'}${movie.poster_path}`;
      movieImgPoster.alt = movie.title;
      movieImgPoster.style.width = cardPosterWidth ?? '150px';
      cardPosterClasses = cardPosterClasses ?? ['w-full', 'h-full', 'object-cover', 'transition-transform', 'duration-300', 'ease-in-out', 'hover:scale-110']
      movieImgPoster.classList.add(...cardPosterClasses);
      
      movieArticle.appendChild(movieImgPoster);
      cardContainerElement.appendChild(movieArticle);
    });
  } catch (error) {
    console.error('Error renderMoviesCards:', error);
  }
}

const renderTrendingMovies = async() => {
  try {
    // renderMoviesCards({id:'prueba',methodName:'getTrendingMovies'});
    const trendingMoviesContainer = $id("trending-movies-container");
    trendingMoviesContainer.innerHTML = ''; // Limpiar contenedor
    
    const trendingMovies = await api.getTrendingMovies();
    state.topRatedMovie = [...trendingMovies].shift();
    renderTopRatedMovie(state.topRatedMovie);
    renderMoviesCards({movies: trendingMovies,cardArticleName:'trending-movie',cardContainerElement:trendingMoviesContainer});
  } catch (error) {
    console.error('Error al renderizar películas tendencia:', error);
  }
}

const renderOnPremiereMovies = async() => {
  try {
    const onPremiereMoviesContainer = $id("onpremiere-movies-container");
    onPremiereMoviesContainer.innerHTML = ''; // Limpiar contenedor
    
    const onPremiereMovies = await api.getOnPremiereMovies();

    renderMoviesCards({movies: onPremiereMovies,cardArticleName:'on-premiere-movie',cardContainerElement:onPremiereMoviesContainer});
    
  } catch (error) {
    console.error('Error al renderizar películas en estreno:', error);
  }
}

const renderMoviesByGenres = async({genreId, genreName}) => {
  try {
    const categoriesTitleElement = $id('categories-title');
    const categoriesGalleryContainer = $id('categories-movies-container');
    categoriesTitleElement.textContent = decodeURIComponent(genreName);
    categoriesGalleryContainer.innerHTML = ''; // Limpiar contenedor
    
    const moviesByGenre = await api.getMoviesByGenreId(genreId);
    console.log(`Genre ${genreName}`,moviesByGenre);

    renderMoviesCards({
      movies: moviesByGenre,
      cardArticleName:'category-movie',
      cardContainerElement:categoriesGalleryContainer,
      cardPosterWidth: '100%'
    });
    
  } catch (error) {
    console.error('Error al renderizar películas en estreno:', error);
  }
}

const renderMoviesByQuerySearch = async({movieQuery}) => {
  try {
    const searchTitleElement = $id('search-page-title');
    const searchGalleryContainer = $id('search-movies-container');
    searchTitleElement.textContent = decodeURIComponent(movieQuery);
    searchGalleryContainer.innerHTML = ''; // Limpiar contenedor
    
    const moviesByQuerySearch = await api.getMoviesByQuery(movieQuery);
    console.log(`Search by:`,movieQuery);

    renderMoviesCards({
      movies: moviesByQuerySearch,
      cardArticleName:'searched-movie',
      cardContainerElement:searchGalleryContainer,
      cardPosterWidth: '100%'
    });
    
  } catch (error) {
    console.error('Error al renderizar películas en estreno:', error);
  }
}

const renderMoviesGenresButtons = async() => {
  try {
    const moviesGenresContainer = $id("genres-movies-container");
    moviesGenresContainer.innerHTML = ''; // Limpiar contenedor
    
    const moviesGenres = await api.getMovieGenres();
    
    moviesGenres.forEach(genre => {
      const genreElement = document.createElement('div');
      genreElement.textContent = genre.name;
      genreElement.id = `genre-${genre.id}`;
      genreElement.classList.add('category-item','px-3','py-1','rounded-md','text-xs','text-white','cursor-pointer','bg-slate-700','hover:bg-slate-800','border-t','border-slate-600');
      genreElement.addEventListener('click',(e) => {
        window.location.hash = `#category=${genre.id}-${genre.name}`
      })
      moviesGenresContainer.appendChild(genreElement);
    });
  } catch (error) {
    console.error('Error al renderizar categorías de películas:', error);
  }
}

const renderTopRatedMovie = async(topRatedMovie) => {
  try {
    console.log(topRatedMovie);
    const mainHeroBanner = $id("main-hero-banner");
    const mainHeroBannerTitle = $id("main-hero-banner-title");
    // mainHeroBanner.innerHTML = ''; // Limpiar contenedor
    mainHeroBanner.classList.add(`bg-[url(https://image.tmdb.org/t/p/w780${topRatedMovie.backdrop_path})]`);
    mainHeroBanner.style.backgroundImage = `url(https://image.tmdb.org/t/p/w780${topRatedMovie.backdrop_path})`;

    mainHeroBannerTitle.innerText = topRatedMovie.title ?? 'Movie Name';

  } catch (error) {
    console.error('Error al renderizar películas tendencia:', error);
  }
}


export {
  HomePage,
  TrendsPage,
  SearchPage,
  MovieDetailsPage,
  CategoriesPage,
  
  // renderTrendingMovies,
  // renderOnPremiereMovies,
  // renderMoviesGenresButtons,
}