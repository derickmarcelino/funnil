package bb.com.uan.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

@Entity
@Table (name = "JornadasUsuario")
public class JornadasUsuario extends PanacheEntityBase{
    
    @Id
    public int idJornada;

    public String matricula;

    public JornadasUsuario(int idJornada, String matricula) {
        this.idJornada = idJornada;
        this.matricula = matricula;
    }

    public JornadasUsuario() {
    }

    public int getIdJornada() {
        return idJornada;
    }

    public void setIdJornada(int idJornada) {
        this.idJornada = idJornada;
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
        result = prime * result + idJornada;
        result = prime * result + ((matricula == null) ? 0 : matricula.hashCode());
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
        JornadasUsuario other = (JornadasUsuario) obj;
        if (idJornada != other.idJornada)
            return false;
        if (matricula == null) {
            if (other.matricula != null)
                return false;
        } else if (!matricula.equals(other.matricula))
            return false;
        return true;
    }

    
    

}
