package com.krakedev.inventarios.servicios;

import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.krakedev.inventarios.bdd.TipodocumentoBDD;
import com.krakedev.inventarios.entidades.TipoDocumento;
import com.krakedev.inventarios.excepciones.KrakeDevException;

@Path("tiposdocumento")
public class ServicioTipoDocumentos {
    private TipodocumentoBDD tipoDocBDD = new TipodocumentoBDD();

    @Path("insertar")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response insertarTipoDocumento(TipoDocumento tipoDocumento) {
        boolean exito = tipoDocBDD.insertarTipoDocumento(tipoDocumento);
        if (exito) {
            return Response.status(Response.Status.CREATED).entity(tipoDocumento).build();
        } else {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Path("recuperar")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response recuperar() {
        ArrayList<TipoDocumento> documentos = null;
        try {
            documentos = tipoDocBDD.recuperar();
            return Response.ok(documentos).build();
        } catch (KrakeDevException e) {
            e.printStackTrace();
            return Response.serverError().build();
        }
    }
}
