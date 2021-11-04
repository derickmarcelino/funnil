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

import bb.com.uan.model.Usuarios;


@Path("/usuarios")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UsuariosResource {
    

    private Set<Usuarios> usuarios = new HashSet<>();

    public UsuariosResource(){
        usuarios.add(new Usuarios());
    }

    @GET
    public Response list() {
        return Response.ok(Usuarios.listAll()).build();
    }

    @POST
    @Transactional
    public Response add(Usuarios usuario) {
    usuario.persist();
    return Response.ok(Usuarios.listAll()).build();
  }

  @DELETE
  @Transactional
  public Response delete(Usuarios usuario) {
    usuario.delete();
    return Response.ok().build();
  }
    }

