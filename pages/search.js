import Head from 'next/head'
import Header from '../components/Header'
import Response from '../Response'
import { useRouter } from 'next/router'
import SearchResults from '../components/SearchResults'

function Search({ results }) {
  const router = useRouter()

  console.log(results)
  return (
    <div>
      <Head>
        <title>{router.query.term} - Google Search</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {/* Header */}
      <Header />
      {/*Search results*/}
      <SearchResults results={results} />
    </div>
  )
}

export default Search

export async function getServerSideProps(context) {
  const useDummyData = false
  const startIndex = context.query.start || '0'

  const data = useDummyData
    ? Response
    : await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${process.env.API_KEY}&cx=${process.env.API_CONTEXT}&q=${context.query.term}&start=${startIndex}`
      ).then((request) => request.json())

  // * After the server has rendered... Pass the results to the client
  return {
    props: {
      results: data,
    },
  }
}
