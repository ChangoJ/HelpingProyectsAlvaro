package com.krakedev.inventarios.bdd;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import com.krakedev.inventarios.entidades.TipoDocumento;
import com.krakedev.inventarios.excepciones.KrakeDevException;
import com.krakedev.inventarios.utils.ConexionBDD;

public class TipodocumentoBDD {
	public ArrayList<TipoDocumento> recuperar() throws KrakeDevException{
    	ArrayList<TipoDocumento> documentos=new ArrayList<TipoDocumento>();
    	Connection con=null;
    	PreparedStatement ps=null;
    	ResultSet rs=null;
    	TipoDocumento tipodoc=null;
    	try {
			con=ConexionBDD.obtenerConexion();
			ps=con.prepareStatement("select codigo_doc,descripcion"
					+ " from tipo_de_documento ");
			//ps.setString(1, "%"+subcadena.toUpperCase()+"%");
			//System.out.println(">>>>>>>>>"+ps);
			rs=ps.executeQuery();
			
			while(rs.next()) {
				String codigo=rs.getString("codigo_doc");
				String descripcion=rs.getString("descripcion");
				tipodoc = new TipoDocumento(codigo,descripcion);
				documentos.add(tipodoc);
			}
		} catch (KrakeDevException e) {
			e.printStackTrace();
			throw e;
		} catch (SQLException e) {
			e.printStackTrace();
			throw new KrakeDevException("Error al consultar. Detalle:"+e.getMessage());
		}
    	return documentos;
    }
	public boolean insertarTipoDocumento(TipoDocumento tipoDocumento) {
        String sql = "insert into tipo_de_documento (codigo_doc, descripcion) values (?, ?)";
        try (Connection conn = ConexionBDD.obtenerConexion();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, tipoDocumento.getCodigo());
            pstmt.setString(2, tipoDocumento.getDescripcion());
            int rowsAffected = pstmt.executeUpdate();
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        } catch (KrakeDevException e1) {
			e1.printStackTrace();
		}
		return false;
    }
}
