from .models import Pessoa

class PessoaTask:
    @staticmethod
    def pesquisar_por_nome(nome):
        return Pessoa.objects.filter(nome__icontains=nome)

    @staticmethod
    def pesquisar_todos():
        return Pessoa.objects.all()
    
    @staticmethod
    def incluir(pessoa_data):
        return Pessoa.objects.create(**pessoa_data)

    @staticmethod
    def alterar(pessoa_id, pessoa_data):
        pessoa = Pessoa.objects.filter(id=pessoa_id).first()
        if pessoa:
            for key, value in pessoa_data.items():
                setattr(pessoa, key, value)
            pessoa.save()
        return pessoa

    @staticmethod
    def excluir(pessoa_id):
        pessoa = Pessoa.objects.filter(id=pessoa_id).first()
        if pessoa:
            pessoa.delete()

    @staticmethod
    def pesquisar(pessoa_id):
        return Pessoa.objects.filter(id=pessoa_id).first()