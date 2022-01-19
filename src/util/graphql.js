import gql from 'graphql-tag';

export const FETCH_STOCK_QUERY = gql`
  query($stockId: ID!) {
    getStock(stockId: $stockId) {
        id
        username
        createdAt
        closingPrice
        timeStamp
        news {
          id
          newsID
          newsText
          priceEffect
        }
        participantInfo {
          id
          status
          sequence
          controlGroup
        }
        cdecisions
        money
    }
  }
`;

export const FETCH_STOCKS_QUERY = gql`
  {
    getStocks {
        id
        username
        createdAt
        closingPrice
        decisions
    }
  }
`;

export const FETCH_ALLNEWS_QUERY = gql`
  {
    getAllNews {
      id
      newsID
      newsText
      priceEffect
    }
  }
`;

export const CREATE_STOCK = gql`
  mutation createStock($ticker: String!, $prob: String!) {
    createStock(ticker: $ticker, prob: $prob) {
    id
  }
  }
`;

export const UPDATE_STOCK = gql`
  mutation updateStock($stockId: ID!, $timeStamp: [Int]!, $cdecisions: [Int]!, $money: [Float]!) {
    updateStock(stockId: $stockId, 
              timeStamp : $timeStamp,
              cdecisions : $cdecisions,
              money : $money) {
    id
  }
  }
`;

export const UPDATE_NEWS = gql`
  mutation updateNews($id: ID!, $newsText: String!, $newsID: Int!, $priceEffect: Int!){
    updateNews(id: $id,
              newsText: $newsText,
              newsID: $newsID,
              priceEffect: $priceEffect){
    id
    newsID
    newsText
    priceEffect
  }
  }
`;

export const DELETE_NEWS = gql`
  mutation deleteNews($id: ID!) {
    deleteNews(id: $id) {
      id
    }
  }
`;

export const REGISTER_NEWS = gql`
  mutation registerNews($newsText: String!, $priceEffect: Int!) {
    registerNews(newsText: $newsText, priceEffect: $priceEffect) {
      id
      newsID
      newsText
      priceEffect
    }
  }
`;


// import gql from 'graphql-tag';

// export const FETCH_STOCK_QUERY = gql`
//   query($stockId: ID!) {
//     getStock(stockId: $stockId) {
//         id
//         username
//         createdAt
//         closingPrice
//         predictedPrice
//         prediction
//         decisions
//         timeStamp
//         news
//         cprediction
//         cdecisions
//         money
//         prob
//     }
//   }
// `;

// export const FETCH_STOCKS_QUERY = gql`
//   {
//     getStocks {
//         id
//         username
//         createdAt
//         closingPrice
//         prediction
//         decisions
//     }
//   }
// `;

// export const CREATE_STOCK = gql`
//   mutation createStock($ticker: String!, $prob: String!) {
//     createStock(ticker: $ticker, prob: $prob) {
//     id
//   }
//   }
// `;

// export const UPDATE_STOCK = gql`
//   mutation updateStock($stockId: ID!, $decisions: [Int]!, $timeStamp: [Int]!, $cprediction: [Int]!, $cdecisions: [Int]!, $money: [Float]!) {
//     updateStock(stockId: $stockId, 
//               decisions: $decisions,
//               timeStamp : $timeStamp,
//               cprediction: $cprediction,
//               cdecisions : $cdecisions,
//               money : $money) {
//     id
//   }
//   }
// `;

   