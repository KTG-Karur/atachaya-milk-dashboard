import React from "react";
import { Card, Button } from "react-bootstrap";

const SimpleTableCard = ({ title, children, className, subtitle, onClick }) => {
  return (
    <Card className={className}>
      <Card.Body>
        {(title || subtitle) && (
          <div className="simple-card-title">
            <div className="row">
              <div className="col-md-8">
                {title && <h3 className="text-capitalize mb-1">{title}</h3>}
                {subtitle && <h6 className="text-mutee">{subtitle}</h6>}
              </div>
              <div className="col-md-4" >
                {
                  onClick && (
                    <Button className="text-capitalize position-absolute end-0" style={{ marginRight: "10px" }} onClick={() => onClick && onClick()}>
                      {"Add"}
                    </Button>
                  )
                }
              </div>
            </div>
          </div>
        )}
        {children}
      </Card.Body>
    </Card>
  );
};

export default SimpleTableCard;
