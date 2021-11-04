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
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import bb.com.uan.model.Funil;

@Path("/funil")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class FunilResource {

    private Set<Funil> funil = new HashSet<>();

    public FunilResource() {
        funil.add(new Funil());
    }

    @GET
    public Response list() {
        return Response.ok(Funil.listAll()).build();
    }

    @GET
    @Path("/{id}")
    public Response listbyId(@QueryParam("id") int id) {
        return Response.ok(Funil.findById(id)).build();
    }

    @GET
    @Path("/jornada/{id}")
    public Response listbyJornada(@QueryParam("IdJornada") int idJornada) {
        return Response.ok(Funil.find("IdJornada", idJornada).list()).build();
    }

    @POST
    @Transactional
    public Response add(Funil funil) {
        funil.persist();
        return Response.ok(Funil.listAll()).build();
    }

    @DELETE
    @Transactional
    public Response delete(Funil funil) {
        funil.delete();
        return Response.ok().build();
    }
}
