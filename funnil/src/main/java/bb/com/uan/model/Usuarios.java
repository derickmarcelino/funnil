package bb.com.uan.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;


@Entity
@Table(name = "Usuarios")
public class Usuarios extends PanacheEntityBase{
    
    @Id
    public String matricula;

    public int uor;

    public Usuarios(String matricula, int uor) {
        this.matricula = matricula;
        this.uor = uor;
    }

    public Usuarios() {
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public int getUor() {
        return uor;
    }

    public void setUor(int uor) {
        this.uor = uor;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((matricula == null) ? 0 : matricula.hashCode());
        result = prime * result + uor;
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
        Usuarios other = (Usuarios) obj;
        if (matricula == null) {
            if (other.matricula != null)
                return false;
        } else if (!matricula.equals(other.matricula))
            return false;
        if (uor != other.uor)
            return false;
        return true;
    }


    
}
