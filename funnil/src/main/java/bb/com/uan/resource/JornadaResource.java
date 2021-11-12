package bb.com.uan.resource;
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

import bb.com.uan.model.Funil;
import bb.com.uan.model.Jornada;

import javax.ws.rs.QueryParam;



@Path("/jornada")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class JornadaResource {
    

    private Set<Jornada> jornadas= new HashSet<>();

    public JornadaResource(){
        jornadas.add(new Jornada());
    }

    @GET
    public Response list() {
        return Response.ok(Jornada.listAll()).build();
    }

    @GET
    @Path("/status/{status}")
    public Response listbyStatus(@PathParam("status")String status) {
        return Response.ok(Jornada.find("status = ?1",status)).build();
    }

    @GET
    @Path("{id}")
    public Response listbyId(@QueryParam("id")int id) {
        return Response.ok(Jornada.findById(id)).build();
    }

    

    @POST
    @Transactional
    public Response add(Jornada jornadas) {
        jornadas.persist();
    return Response.ok(Jornada.listAll()).build();
  }

  @DELETE
  @Transactional
  public Response delete(Jornada jornadas) {
    Jornada.flush();
    Jornada.deleteById(jornadas.idJornada);
    //jornadas.delete();
    return Response.ok().build();
  }
    }

