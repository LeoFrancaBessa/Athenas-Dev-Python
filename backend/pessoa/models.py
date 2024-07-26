from django.db import models

from django.db import models

class Pessoa(models.Model):
    SEXO_CHOICES = (
        ('M', 'Masculino'),
        ('F', 'Feminino'),
    )

    nome = models.CharField(max_length=100)
    data_nasc = models.DateField()
    cpf = models.CharField(max_length=11, unique=True)
    sexo = models.CharField(max_length=1, choices=SEXO_CHOICES)
    altura = models.FloatField()
    peso = models.FloatField()

    def calcular_peso_ideal(self):
        if self.sexo == 'M':
            return round((72.7 * self.altura) - 58, 2)
        else:
            return round((62.1 * self.altura) - 44.7, 2)

    def __str__(self):
        return self.nome