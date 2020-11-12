package io.github.fernandoschimidt.agenda_api.model.repository;

import io.github.fernandoschimidt.agenda_api.model.entity.Contato;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContatoRepository extends JpaRepository<Contato,Integer> {
}
