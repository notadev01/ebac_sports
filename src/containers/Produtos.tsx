import { Produto as ProdutoType } from '../App'
import { useGetProdutosQuery } from '../api'
import Produto from '../components/Produto'

import * as S from './styles'

type Props = {
  favoritos: ProdutoType[]
  favoritar: (produto: ProdutoType) => void
}

const ProdutosComponent = ({ favoritos, favoritar }: Props) => {
  const { data: listaProdutos, isLoading } = useGetProdutosQuery()

  const produtoEstaNosFavoritos = (produto: ProdutoType) => {
    const produtoId = produto.id
    const IdsDosFavoritos = favoritos.map((f) => f.id)

    return IdsDosFavoritos.includes(produtoId)
  }

  if (isLoading) return <h2>Carregando...</h2>

  return (
    <>
      <S.Produtos>
        {listaProdutos?.map((produto) => (
          <Produto
            estaNosFavoritos={produtoEstaNosFavoritos(produto)}
            key={produto.id}
            produto={produto}
            favoritar={favoritar}
          />
        ))}
      </S.Produtos>
    </>
  )
}

export default ProdutosComponent
