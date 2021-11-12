package bb.com.uan.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

@Entity
@Table(name = "Jornada")
public class Jornada extends PanacheEntityBase {

    @Id
    public int idJornada;
    public String inicioJanela;
    public String fimJanela;
    public String nomeJornada;
    public String status;
    public int diasJanela;
    public String matricula;
    
    public Jornada() {
    }

    public Jornada(int idJornada, String inicioJanela, String fimJanela, String nomeJornada, String status,
            int diasJanela,  String matricula) {
        this.idJornada = idJornada;
        this.inicioJanela = inicioJanela;
        this.fimJanela = fimJanela;
        this.nomeJornada = nomeJornada;
        this.status = status;
        this.diasJanela = diasJanela;
        this.matricula = matricula;
    }

    public int getIdJornada() {
        return idJornada;
    }

    public void setIdJornada(int idJornada) {
        this.idJornada = idJornada;
    }

    public String getInicioJanela() {
        return inicioJanela;
    }

    public void setInicioJanela(String inicioJanela) {
        this.inicioJanela = inicioJanela+"-01";
    }

    public String getFimJanela() {
        return fimJanela;
    }

    public void setFimJanela(String fimJanela) {
        this.fimJanela = fimJanela;
    }

    public String getNomeJornada() {
        return nomeJornada;
    }

    public void setNomeJornada(String nomeJornada) {
        this.nomeJornada = nomeJornada;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getDiasJanela() {
        return diasJanela;
    }

    public void setDiasJanela(int diasJanela) {
        this.diasJanela = diasJanela;
    }

  

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + diasJanela;
        result = prime * result + ((fimJanela == null) ? 0 : fimJanela.hashCode());
        result = prime * result + idJornada;
        result = prime * result + ((inicioJanela == null) ? 0 : inicioJanela.hashCode());
        result = prime * result + ((matricula == null) ? 0 : matricula.hashCode());
        result = prime * result + ((nomeJornada == null) ? 0 : nomeJornada.hashCode());
        result = prime * result + ((status == null) ? 0 : status.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Jornada other = (Jornada) obj;
        if (diasJanela != other.diasJanela)
            return false;
        if (fimJanela == null) {
            if (other.fimJanela != null)
                return false;
        } else if (!fimJanela.equals(other.fimJanela))
            return false;
        if (idJornada != other.idJornada)
            return false;
        if (inicioJanela == null) {
            if (other.inicioJanela != null)
                return false;
        } else if (!inicioJanela.equals(other.inicioJanela))
            return false;
        if (matricula == null) {
            if (other.matricula != null)
                return false;
        } else if (!matricula.equals(other.matricula))
            return false;
        if (nomeJornada == null) {
            if (other.nomeJornada != null)
                return false;
        } else if (!nomeJornada.equals(other.nomeJornada))
            return false;
        if (status == null) {
            if (other.status != null)
                return false;
        } else if (!status.equals(other.status))
            return false;
        return true;
    }

    
    
    }

    
   
    
