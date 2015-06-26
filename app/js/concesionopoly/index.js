import Browser from './browser'

export default function Concesionopoly (board) {
  let browser = new Browser(board)
  let engine = browser.engine
  return engine.getState.bind(engine.getState)
}
