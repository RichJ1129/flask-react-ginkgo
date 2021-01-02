import React from "react";
import {Container, Table} from "react-bootstrap";

export const Sequences = ({ sequences }) => {
  return (
      <Table striped bordered hover>
        <thead>
      <tr>
        <th>Search Time </th>
        <th>Definition</th>
        <th>Search String</th>
        <th>Start Position</th>
        <th>End Position</th>
      </tr>
    </thead>
        <tbody>
      {sequences.map(sequence => {
        return (
      <tr>
        <td>{sequence.time}</td>
        <td>{sequence.name}</td>
        <td>{sequence.search_string}</td>
        <td>{sequence.start_pos}</td>
        <td>{sequence.end_pos}</td>
      </tr>
        );
      })}
      </tbody>
    </Table>
  );
};