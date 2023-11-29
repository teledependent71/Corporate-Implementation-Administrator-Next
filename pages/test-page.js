import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'

import authorsResource from '../resources/authors'

const TestPage = (props) => {
  return (
    <>
      <div className="test-page-container">
        <Head>
          <title>test-page - Corporate Implementation Administrator</title>
          <meta
            property="og:title"
            content="test-page - Corporate Implementation Administrator"
          />
        </Head>
        <DataProvider
          renderSuccess={(context_p4vud) => (
            <>
              <h1>{context_p4vud?.Name}</h1>
            </>
          )}
          initialData={props.contextP4vudProp}
          persistDataDuringLoading={true}
          key={props?.contextP4vudProp?.id}
        />
      </div>
      <style jsx>
        {`
          .test-page-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

export default TestPage

export async function getStaticProps(context) {
  try {
    const contextP4vudProp = await authorsResource({
      ...context?.params,
    })
    return {
      props: {
        contextP4vudProp: contextP4vudProp?.data?.[0],
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
