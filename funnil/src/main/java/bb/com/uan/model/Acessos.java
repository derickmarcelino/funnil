package bb.com.uan.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

@Entity
@Table(name = "Acessos")
public class Acessos extends PanacheEntityBase {
    
    @Id
    public int idAcessos;

    public int idTelas;

    public String diaAcessos;

    public int totalAcessos;

    
    public Acessos(int idAcessos, int idTelas, String diaAcessos, int totalAcessos) {
        this.idAcessos = idAcessos;
        this.idTelas = idTelas;
        this.diaAcessos = diaAcessos;
        this.totalAcessos = totalAcessos;
    }

    public Acessos() {
    }

    public int getIdAcessos() {
        return idAcessos;
    }

    public void setIdAcessos(int idAcessos) {
        this.idAcessos = idAcessos;
    }

    public int getIdTelas() {
        return idTelas;
    }

    public void setIdTelas(int idTelas) {
        this.idTelas = idTelas;
    }

    public String getDiaAcessos() {
        return diaAcessos;
    }

    public void setDiaAcessos(String diaAcessos) {
        this.diaAcessos = diaAcessos;
    }

    public int getTotalAcessos() {
        return totalAcessos;
    }

    public void setTotalAcessos(int totalAcessos) {
        this.totalAcessos = totalAcessos;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((diaAcessos == null) ? 0 : diaAcessos.hashCode());
        result = prime * result + idAcessos;
        result = prime * result + idTelas;
        result = prime * result + totalAcessos;
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
        Acessos other = (Acessos) obj;
        if (diaAcessos == null) {
            if (other.diaAcessos != null)
                return false;
        } else if (!diaAcessos.equals(other.diaAcessos))
            return false;
        if (idAcessos != other.idAcessos)
            return false;
        if (idTelas != other.idTelas)
            return false;
        if (totalAcessos != other.totalAcessos)
            return false;
        return true;
    }

   


    
}



    
