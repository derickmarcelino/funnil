package bb.com.uan.resource;
import java.sql.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.jboss.resteasy.annotations.Query;

import bb.com.uan.model.Acessos;

import javax.ws.rs.QueryParam;



@Path("/acessos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AcessosResource {
    

    private Set<Acessos> acessos= new HashSet<>();

    public AcessosResource(){
        acessos.add(new Acessos());
    }

    @GET
    public Response list() {
        return Response.ok(Acessos.listAll()).build();
    }

    @GET
    @Path("{id}")
    public Response listbyId(@QueryParam("id")int id) {
        return Response.ok(Acessos.findById(id)).build();
    }

    @GET
    @Path("/telas/{idTelas}")
    public List<Acessos> listbyTelas(@PathParam("idTelas")int idTelas){
        return Acessos.list("idTelas =? 1", idTelas);
    }

    @GET
    @Path("/telas/acessos")
    public List<Acessos> listbyAcessos(@QueryParam("idTelas") int idTelas,
                              @QueryParam("diaInicio") Date diaInicio, 
                              @QueryParam("diaFim") Date diaFim
                            ){
        return Acessos.list("totalAcessos where idTelas =? 1 and date(diaAcessos) between =? 2 and =? 3", idTelas,diaInicio,diaFim);
    }
    @POST
    @Transactional
    public Response add(Acessos acessos) {
        acessos.persist();
    return Response.ok(Acessos.listAll()).build();
  }

  @DELETE
  @Transactional
  public Response delete(Acessos acessos) {
    Acessos.flush();
    Acessos.deleteById(acessos.idAcessos);
    //jornadas.delete();
    return Response.ok().build();
  }
    }
