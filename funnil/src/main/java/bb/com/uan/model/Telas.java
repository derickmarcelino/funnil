package bb.com.uan.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

@Entity
@Table(name = "Telas")
public class Telas extends PanacheEntityBase{ 

    @Id
    public int idTelas;

    public String urlAcesso;

    public String nomeAmigavel;


    public Telas(int idTelas, String urlAcesso, String nomeAmigavel) {
        this.idTelas= idTelas;
        this.urlAcesso = urlAcesso;
        this.nomeAmigavel = nomeAmigavel;
    }

    public Telas() {
    }

    public int getIdTelas() {
        return idTelas;
    }

    public void setIdTelas(int idTelas) {
        this.idTelas = idTelas;
    }

    public String getUrlAcesso() {
        return urlAcesso;
    }

    public void setUrlAcesso(String urlAcesso) {
        this.urlAcesso = urlAcesso;
    }

    public String getNomeAmigavel() {
        return nomeAmigavel;
    }

    public void setNomeAmigavel(String nomeAmigavel) {
        this.nomeAmigavel = nomeAmigavel;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + idTelas;
        result = prime * result + ((nomeAmigavel == null) ? 0 : nomeAmigavel.hashCode());
        result = prime * result + ((urlAcesso == null) ? 0 : urlAcesso.hashCode());
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
        Telas other = (Telas) obj;
        if (idTelas!= other.idTelas)
            return false;
        if (nomeAmigavel == null) {
            if (other.nomeAmigavel != null)
                return false;
        } else if (!nomeAmigavel.equals(other.nomeAmigavel))
            return false;
        if (urlAcesso == null) {
            if (other.urlAcesso != null)
                return false;
        } else if (!urlAcesso.equals(other.urlAcesso))
            return false;
        return true;
    }

}
