import Header from "@components/common/Header/Header";
import Modal from "@components/common/Modal/Modal";
import Plans from "@components/common/Plans/Plans";
import Spinner from "@components/common/Spinner/Spinner";
import Banner from "@components/home/Banner/Banner";
import Row from "@components/home/Row/Row";
import { useAuth } from "@hooks/useAuth";
import useSubscription from "@hooks/useSubscription";
import { payments } from "@lib/stripe/stripe";
import { getProducts } from "@stripe/firestore-stripe-payments";
import { getMovies } from "@utils/api/getMovies";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { HomeProps } from "src/types";

const Home: NextPage<HomeProps> = ({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
  products,
}) => {
  const { loading, user } = useAuth();
  const subscription = useSubscription(user);

  if (loading || subscription === null) return <Spinner />;

  if (!subscription) return <Plans products={products} />;

  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <Head>
        <title>Netflix | Home</title>
        <meta name="description" content="Netflix home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Banner netflixOriginals={netflixOriginals} />
        <section className="md:space-y-24">
          <Row title="Trending" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action" movies={actionMovies} />
          <Row title="Comedy" movies={comedyMovies} />
          <Row title="Horror" movies={horrorMovies} />
          <Row title="Romance" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>
      <Modal />
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const movies = await getMovies();

  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  });

  return {
    props: { ...movies, products },
  };
};
