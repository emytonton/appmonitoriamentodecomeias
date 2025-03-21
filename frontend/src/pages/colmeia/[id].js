import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Container, Typography } from '@mui/material';

const fetchColmeia = async (id) => {
  try {
    const { data } = await axios.get(`/api/colmeias/${id}`);
    return data;
  } catch (error) {
    console.error('Erro ao buscar colmeia:', error);
    return null;
  }
};

export default function DetalhesColmeia() {
  const router = useRouter();
  const { id } = router.query;

  const { data: colmeia, isLoading } = useQuery({
    queryKey: ['colmeia', id],
    queryFn: () => fetchColmeia(id),
    enabled: !!id, // Só executa a query se houver um ID
  });

  if (isLoading) return <p>Carregando...</p>;
  if (!colmeia) return <p>Colmeia não encontrada.</p>;

  return (
    <Container>
      <Typography variant="h4">{colmeia.nome}</Typography>
      <Typography>Localização: {colmeia.localizacao}</Typography>
      <Typography>Temperatura: {colmeia.temperatura}°C</Typography>
      <Typography>Umidade: {colmeia.umidade}%</Typography>
    </Container>
  );
}
