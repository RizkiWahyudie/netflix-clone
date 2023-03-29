import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Navbar from "@/components/navbar";
import Billboard from "@/components/billboard";
import MovieList from "@/components/movieList";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import useInfoModalStore from "@/hooks/useInfoModalStore";
import InfoModal from "@/components/InfoModal";
import Head from "next/head";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModalStore();
  return (
    <>
      <Head>
        <title>Netflix Clone</title>
        <link rel="shortcut icon" href="/logoN.png" />
      </Head>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  );
}
