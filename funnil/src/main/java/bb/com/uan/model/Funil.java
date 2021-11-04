package bb.com.uan.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

@Entity
@Table(name = "Funil")
public class Funil extends PanacheEntityBase {
    
    @Id
    public int idFunil;

    public int idJornada;

    public int idTelas;

    public int ordemAcesso;

    
    public Funil() {
      
    }
    

    public Funil(int idFunil, int idJornada, int idTelas, int ordemAcesso) {
        this.idFunil = idFunil;
        this.idJornada = idJornada;
        this.idTelas = idTelas;
        this.ordemAcesso = ordemAcesso;
    
    }


    public int getIdFunil() {
        return idFunil;
    }

    public void setIdFunil(int idFunil) {
        this.idFunil = idFunil;
    }

    public int getIdJornada() {
        return idJornada;
    }

    public void setIdJornada(int idJornada) {
        this.idJornada = idJornada;
    }

    public int getIdTelas() {
        return idTelas;
    }

    public void setIdTelas(int idTelas) {
        this.idTelas = idTelas;
    }

    public int getOrdemAcesso() {
        return ordemAcesso;
    }

    public void setOrdemAcesso(int ordemAcesso) {
        this.ordemAcesso = ordemAcesso;
    }

   


    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + idFunil;
        result = prime * result + idJornada;
        result = prime * result + idTelas;
        result = prime * result + ordemAcesso;
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
        Funil other = (Funil) obj;
        if (idFunil != other.idFunil)
            return false;
        if (idJornada != other.idJornada)
            return false;
        if (idTelas != other.idTelas)
            return false;
        if (ordemAcesso != other.ordemAcesso)
            return false;
        return true;
    }
    

    

}


/*

quarkus.datasource.db-kind=mysql
quarkus.datasource.jdbc.url = jdbc:mysql://remotemysql.com:3306/A75OHDNVaT
quarkus.datasource.username = A75OHDNVaT
quarkus.datasource.password = p9ldEBVKgK


*/