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



import bb.com.uan.model.Acessos;

import javax.ws.rs.QueryParam;

@Path("/acessos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AcessosResource {

    private Set<Acessos> acessos = new HashSet<>();

    public AcessosResource() {
        acessos.add(new Acessos());
    }

    @GET
    public Response list() {
        return Response.ok(Acessos.listAll()).build();
    }

    @GET
    @Path("{id}")
    public Response listbyId(@QueryParam("id") int id) {
        return Response.ok(Acessos.findById(id)).build();
    }

    @GET
    @Path("/telas/{idTelas}")
    public List<Acessos> listbyTelas(@PathParam("idTelas") int idTelas) {
        return Acessos.list("idTelas =? 1", idTelas);
    }

    @GET
    @Path("/telas/acessos")
    public long listtbyAcessos(@QueryParam("idTelas") int idTelas,
                               @QueryParam("dataInicio") Date dataInicio,
                               @QueryParam("dataFim") Date dataFim
                            ){
                               List<Acessos> lista = Acessos.list("idTelas =? 1 ", idTelas);
                               int cont=0; 
                               for (int i=0;i<lista.size();i++){
                                   if(lista.get(i).diaAcessos.compareTo(dataInicio) >= 0 && lista.get(i).diaAcessos.compareTo(dataFim) <= 0 ){
                                    cont+=lista.get(i).totalAcessos;
                                   }
                                }
        return cont;
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
        // jornadas.delete();
        return Response.ok().build();
    }
}
