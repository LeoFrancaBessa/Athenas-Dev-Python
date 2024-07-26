from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Pessoa
from .serializers import PessoaSerializer
from .services import PessoaService

class PessoaViewSet(viewsets.ViewSet):
    def get_queryset(self):
        nome = self.request.query_params.get('nome', None)
        if nome:
            return PessoaService.pesquisar_por_nome(nome)
        return PessoaService.pesquisar_todos()  # Adapte conforme sua implementação

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if queryset:
            serializer = PessoaSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response({'message': 'No people found with that name'}, status=status.HTTP_404_NOT_FOUND)

    def create(self, request):
        pessoa_data = request.data
        pessoa = PessoaService.incluir(pessoa_data)
        serializer = PessoaSerializer(pessoa)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        pessoa = PessoaService.pesquisar(pk)
        if pessoa:
            serializer = PessoaSerializer(pessoa)
            return Response(serializer.data)
        return Response({'message': 'not found'}, status=status.HTTP_404_NOT_FOUND)

    def update(self, request, pk=None):
        pessoa_data = request.data
        pessoa = PessoaService.alterar(pk, pessoa_data)
        if pessoa:
            serializer = PessoaSerializer(pessoa)
            return Response(serializer.data)
        return Response({'message': 'not found'}, status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk=None):
        PessoaService.excluir(pk)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=['get'])
    def peso_ideal(self, request, pk=None):
        pessoa = PessoaService.pesquisar(pk)
        if pessoa:
            peso_ideal = pessoa.calcular_peso_ideal()
            return Response({'peso_ideal': peso_ideal})
        return Response({'message': 'not found'}, status=status.HTTP_404_NOT_FOUND)