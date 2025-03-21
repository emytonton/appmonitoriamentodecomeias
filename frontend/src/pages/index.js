import { useQuery } from '@tanstack/react-query'; 
import axios from 'axios';
import { Container, Typography, Button, Card, CardContent } from '@mui/material';
import Link from 'next/link';

const fetchColmeias = async () => {
  try {
    const { data } = await axios.get('/api/colmeias');
    return data;
  } catch (error) {
    console.error('Erro ao buscar colmeias:', error);
    return [];
  }
};

const handleDelete = async (id) => {
  try {
    await axios.delete(`/api/colmeias/${id}`);
    alert('Colmeia excluída com sucesso!');
    window.location.reload(); // Recarregar a página para atualizar a lista
  } catch (error) {
    console.error('Erro ao excluir colmeia:', error);
    alert('Erro ao excluir colmeia.');
  }
};

export default function Home() {
  const { data: colmeias = [], isLoading } = useQuery({ queryKey: ['colmeias'], queryFn: fetchColmeias });

  if (isLoading) return <p>Carregando...</p>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Lista de Colmeias</Typography>
      <Link href="/colmeia/nova" passHref>
        <Button variant="contained" color="primary" component="a">Cadastrar Nova</Button>
      </Link>
      {colmeias.length > 0 ? (
        colmeias.map((colmeia) => (
          <Card key={colmeia.id} style={{ marginTop: '10px' }}>
            <CardContent>
              <Typography variant="h6">{colmeia.nome}</Typography>
              <Typography>Localização: {colmeia.localizacao}</Typography>
              <Link href={`/colmeia/${colmeia.id}`} passHref>
                <Button variant="outlined" color="secondary" component="a" style={{ marginRight: '10px' }}>
                  Detalhes
                </Button>
              </Link>
              <Button variant="outlined" color="error" onClick={() => handleDelete(colmeia.id)}>Excluir</Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1" style={{ marginTop: '10px' }}>
          Nenhuma colmeia cadastrada.
        </Typography>
      )}
    </Container>
  );
}