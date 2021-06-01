import { Button, FormGroup, TextInput } from "@patternfly/react-core";
import React, { useState } from "react";
import { HelpItem } from "../../../components/help-enabler/HelpItem";
import type { UseFormMethods } from "react-hook-form";
import { useTranslation } from "react-i18next";

import type ClientRepresentation from "keycloak-admin/lib/defs/clientRepresentation";
import type RoleRepresentation from "keycloak-admin/lib/defs/roleRepresentation";
import { AddRoleMappingModal } from "../../../components/role-mapping/AddRoleMappingModal";
import "../../user-federation.css";

export type LdapMapperHardcodedLdapRoleProps = {
  form: UseFormMethods;
};

export type CompositeRole = RoleRepresentation & {
  parent: RoleRepresentation;
};

export type Row = {
  client?: ClientRepresentation;
  role: CompositeRole | RoleRepresentation;
};

export const LdapMapperHardcodedLdapRole = ({
  form,
}: LdapMapperHardcodedLdapRoleProps) => {
  const { t } = useTranslation("user-federation");
  const helpText = useTranslation("user-federation-help").t;
  const [showAssign, setShowAssign] = useState(false);

  const selectRoles = async (rows: Row[]) => {
    if (rows[0].client) {
      form.setValue(
        "config.role[0]",
        `${rows[0].client.clientId}.${rows[0].role.name}`
      );
    } else {
      form.setValue("config.role[0]", `${rows[0].role.name}`);
    }
  };

  return (
    <>
      {showAssign && (
        // MF 042921 hardcoded for now, to see modal displayed
        <AddRoleMappingModal
          id="1a85c63a-99bd-4d16-9924-b38b8f7cceaf" // this is the ID for client-scopes > marks-client-scope
          type="client-scope"
          name="name"
          // id={id}
          // type={type}
          // name={name}
          onAssign={selectRoles}
          isRadio={true}
          onClose={() => setShowAssign(false)}
        />
      )}

      <FormGroup
        label={t("common:role")}
        labelIcon={
          <HelpItem
            helpText={helpText("roleHelp")}
            forLabel={t("common:role")}
            forID="kc-role"
          />
        }
        fieldId="kc-role"
        isRequired
      >
        <div className="keycloak__user-federation__assign-role">
          <TextInput
            isRequired
            type="text"
            id="kc-role"
            data-testid="role"
            name="config.role[0]"
            ref={form.register}
          />
          <Button
            className="keycloak__user-federation__assign-role-btn"
            data-testid="selectRole"
            onClick={() => setShowAssign(true)}
          >
            {t("selectRole")}
          </Button>
        </div>
      </FormGroup>
    </>
  );
};
