import Pokemon from './Pokemon'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'

function Home() {
	const [startIndex, setStartIndex] = useState(1)
	const [pokemonsNumber, setPokemonsNumber] = useState(15)
	const [pokemonsData, setPokemonsData] = useState([])

	const fetchPokemons = async () => {
		const newPokemons = []

		for (let i = startIndex; i <= pokemonsNumber; i++) {
			const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
			const data = await response.json()

			const newPokemon = {
				id: data.id,
				name: data.name[0].toUpperCase() + data.name.slice(1),
				type: data.types[0].type.name,
			}

			newPokemons.push(newPokemon)
		}

		setPokemonsData([...pokemonsData, ...newPokemons])
		setStartIndex(startIndex + pokemonsNumber)
		setPokemonsNumber(pokemonsNumber + pokemonsNumber)
	}

	useEffect(() => {
		fetchPokemons()
	}, [])

	const pokemons = pokemonsData.map(data => {
		return <Pokemon key={data.id} id={data.id} name={data.name} type={data.type} />
	})

	return (
		<>
			<Head>
				<title>Pokedex</title>
				<link rel='icon' href='/favicon.ico' />
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
				<meta name='description' content='Check this awesome online Pokedex !' />
				<meta name='keywords' content='Pokedex, Pokemon, React.js, Next.js, API' />
				<meta name='author' content='La C@psule Alumni' />
				<meta name='robots' content='index, follow' />
				<meta name='language' content='English' />
			</Head>
			<div className={styles.container}>
				<h1 className={styles.title}>Pokedex</h1>
				<div className={styles.pokemonContainer}>{pokemons}</div>
				<button type='button' onClick={() => fetchPokemons()} className={styles.next}>
					Next
				</button>
			</div>
		</>
	)
}

export default Home
