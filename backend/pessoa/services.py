from .tasks import PessoaTask
from .models import Pessoa

class PessoaService:
    @staticmethod
    def pesquisar_por_nome(nome):
        return PessoaTask.pesquisar_por_nome(nome)

    @staticmethod
    def pesquisar_todos():
        return PessoaTask.pesquisar_todos()
    
    @staticmethod
    def incluir(pessoa_data):
        return PessoaTask.incluir(pessoa_data)

    @staticmethod
    def alterar(pessoa_id, pessoa_data):
        return PessoaTask.alterar(pessoa_id, pessoa_data)

    @staticmethod
    def excluir(pessoa_id):
        PessoaTask.excluir(pessoa_id)

    @staticmethod
    def pesquisar(pessoa_id):
        return PessoaTask.pesquisar(pessoa_id)