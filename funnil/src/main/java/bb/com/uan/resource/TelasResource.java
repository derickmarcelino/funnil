package bb.com.uan.resource;
import java.util.HashSet;
import java.util.Set;

import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import bb.com.uan.model.Telas;

import javax.ws.rs.QueryParam;



@Path("/telas")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TelasResource {
    

    private Set<Telas> telas= new HashSet<>();

    public TelasResource(){
        telas.add(new Telas());
    }

    @GET
    public Response list() {
        return Response.ok(Telas.listAll()).build();
    }

    @GET
    @Path("{id}")
    public Response listbyId(@QueryParam("id")int id) {
        return Response.ok(Telas.findById(id)).build();
    }


    @POST
    @Transactional
    public Response add(Telas telas) {
        telas.persist();
    return Response.ok(Telas.listAll()).build();
  }

  @DELETE
  @Transactional
  public Response delete(Telas telas) {
    Telas.flush();
    Telas.deleteById(telas.idTelas);
    //jornadas.delete();
    return Response.ok().build();
  }
    }
