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

import bb.com.uan.model.JornadasUsuario;



@Path("/jornadasusuario")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class JornadasUsuarioResource {
    

    private Set<JornadasUsuario> jornadasUsuarios = new HashSet<>();

    public JornadasUsuarioResource(){
        jornadasUsuarios.add(new JornadasUsuario());
    }

    @GET
    public Response list() {
        return Response.ok(JornadasUsuario.listAll()).build();
    }

    @POST
    @Transactional
    public Response add(JornadasUsuario jornadasUsuarios) {
        jornadasUsuarios.persist();
    return Response.ok(JornadasUsuario.listAll()).build();
  }

  @DELETE
  @Transactional
  public Response delete(JornadasUsuario jornadasUsuarios) {
    jornadasUsuarios.delete();
    return Response.ok().build();
  }
    }

