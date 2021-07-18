import { GetStaticProps } from "next"
import Head from "next/head"
import { SubscribeButton } from "../components/SubscribeButton"
import { stripe } from "../services/stripe"

import styles from "./home.module.scss"

// Next tem 3 formas principais de fazer chamadas a api

// Informações que não precisam ser carregadas automaticamente, ações que o usário toma enquanto mexe na aplicação ex: Comentários do post de um blog
// Client Side - client side rendering

// Informações direcionadas ao usuários em si, que podem se modificar em tempo real ex: Usuário fez login na página, tem que mostra nome dele. Usuário colocou algum produto no carrinho de compras
// Server Side - server side rendering

// Para informações que todos os usuários possam receber igual ex: Home page, uma página de login...
// Static Site Generation

interface HomeProps {
  product: {
    priceId: string,
    amount: number
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span> 
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

// Anterior - getServerSideProps carrega no servidor node do next e essas informações todas as vezes que fosse acessada a página
// getStaticProps após carregar a página 1 vez é para salvar o html (deixa a página estática), assim todas as outras requisições utilizam essa página estática, aumentando a performance
// Mas, tudo depende do contexto que essa informação está.
export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1J2R3yHvWeLNiAmA3fIhfyr9")

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100), // passando valor para centavos, melhor de manipular
  }

  return {
    props: {
      product,
    },
    revalidate: 60*60*24, // 24 horas
  }
}