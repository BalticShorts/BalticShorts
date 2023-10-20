/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Autocomplete,
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { fetchByPath, validateField } from "./utils";
import { API } from "aws-amplify";
import { getMovieTeam, listPersonMovieTeams } from "../graphql/queries";
import { updateMovieTeam, updatePersonMovieTeam } from "../graphql/mutations";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function MovieTeamUpdateForm(props) {
  const {
    id: idProp,
    movieTeam: movieTeamModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    director: [],
    operator: [],
    scenario: [],
    editor: [],
    actors: [],
    costumes: [],
    makeup: [],
    executive_producer: [],
    producer: [],
    producer_org: [],
    PersonMovieTeams: [],
  };
  const [director, setDirector] = React.useState(initialValues.director);
  const [operator, setOperator] = React.useState(initialValues.operator);
  const [scenario, setScenario] = React.useState(initialValues.scenario);
  const [editor, setEditor] = React.useState(initialValues.editor);
  const [actors, setActors] = React.useState(initialValues.actors);
  const [costumes, setCostumes] = React.useState(initialValues.costumes);
  const [makeup, setMakeup] = React.useState(initialValues.makeup);
  const [executive_producer, setExecutive_producer] = React.useState(
    initialValues.executive_producer
  );
  const [producer, setProducer] = React.useState(initialValues.producer);
  const [producer_org, setProducer_org] = React.useState(
    initialValues.producer_org
  );
  const [PersonMovieTeams, setPersonMovieTeams] = React.useState(
    initialValues.PersonMovieTeams
  );
  const [PersonMovieTeamsLoading, setPersonMovieTeamsLoading] =
    React.useState(false);
  const [PersonMovieTeamsRecords, setPersonMovieTeamsRecords] = React.useState(
    []
  );
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = movieTeamRecord
      ? {
          ...initialValues,
          ...movieTeamRecord,
          PersonMovieTeams: linkedPersonMovieTeams,
        }
      : initialValues;
    setDirector(cleanValues.director ?? []);
    setCurrentDirectorValue("");
    setOperator(cleanValues.operator ?? []);
    setCurrentOperatorValue("");
    setScenario(cleanValues.scenario ?? []);
    setCurrentScenarioValue("");
    setEditor(cleanValues.editor ?? []);
    setCurrentEditorValue("");
    setActors(cleanValues.actors ?? []);
    setCurrentActorsValue("");
    setCostumes(cleanValues.costumes ?? []);
    setCurrentCostumesValue("");
    setMakeup(cleanValues.makeup ?? []);
    setCurrentMakeupValue("");
    setExecutive_producer(cleanValues.executive_producer ?? []);
    setCurrentExecutive_producerValue("");
    setProducer(cleanValues.producer ?? []);
    setCurrentProducerValue("");
    setProducer_org(cleanValues.producer_org ?? []);
    setCurrentProducer_orgValue("");
    setPersonMovieTeams(cleanValues.PersonMovieTeams ?? []);
    setCurrentPersonMovieTeamsValue(undefined);
    setCurrentPersonMovieTeamsDisplayValue("");
    setErrors({});
  };
  const [movieTeamRecord, setMovieTeamRecord] =
    React.useState(movieTeamModelProp);
  const [linkedPersonMovieTeams, setLinkedPersonMovieTeams] = React.useState(
    []
  );
  const canUnlinkPersonMovieTeams = true;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getMovieTeam.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getMovieTeam
        : movieTeamModelProp;
      const linkedPersonMovieTeams = record?.PersonMovieTeams?.items ?? [];
      setLinkedPersonMovieTeams(linkedPersonMovieTeams);
      setMovieTeamRecord(record);
    };
    queryData();
  }, [idProp, movieTeamModelProp]);
  React.useEffect(resetStateValues, [movieTeamRecord, linkedPersonMovieTeams]);
  const [currentDirectorValue, setCurrentDirectorValue] = React.useState("");
  const directorRef = React.createRef();
  const [currentOperatorValue, setCurrentOperatorValue] = React.useState("");
  const operatorRef = React.createRef();
  const [currentScenarioValue, setCurrentScenarioValue] = React.useState("");
  const scenarioRef = React.createRef();
  const [currentEditorValue, setCurrentEditorValue] = React.useState("");
  const editorRef = React.createRef();
  const [currentActorsValue, setCurrentActorsValue] = React.useState("");
  const actorsRef = React.createRef();
  const [currentCostumesValue, setCurrentCostumesValue] = React.useState("");
  const costumesRef = React.createRef();
  const [currentMakeupValue, setCurrentMakeupValue] = React.useState("");
  const makeupRef = React.createRef();
  const [currentExecutive_producerValue, setCurrentExecutive_producerValue] =
    React.useState("");
  const executive_producerRef = React.createRef();
  const [currentProducerValue, setCurrentProducerValue] = React.useState("");
  const producerRef = React.createRef();
  const [currentProducer_orgValue, setCurrentProducer_orgValue] =
    React.useState("");
  const producer_orgRef = React.createRef();
  const [
    currentPersonMovieTeamsDisplayValue,
    setCurrentPersonMovieTeamsDisplayValue,
  ] = React.useState("");
  const [currentPersonMovieTeamsValue, setCurrentPersonMovieTeamsValue] =
    React.useState(undefined);
  const PersonMovieTeamsRef = React.createRef();
  const getIDValue = {
    PersonMovieTeams: (r) => JSON.stringify({ id: r?.id }),
  };
  const PersonMovieTeamsIdSet = new Set(
    Array.isArray(PersonMovieTeams)
      ? PersonMovieTeams.map((r) => getIDValue.PersonMovieTeams?.(r))
      : getIDValue.PersonMovieTeams?.(PersonMovieTeams)
  );
  const getDisplayValue = {
    PersonMovieTeams: (r) => r?.id,
  };
  const validations = {
    director: [],
    operator: [],
    scenario: [],
    editor: [],
    actors: [],
    costumes: [],
    makeup: [],
    executive_producer: [],
    producer: [],
    producer_org: [],
    PersonMovieTeams: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const fetchPersonMovieTeamsRecords = async (value) => {
    setPersonMovieTeamsLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: { or: [{ id: { contains: value } }] },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await API.graphql({
          query: listPersonMovieTeams.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listPersonMovieTeams?.items;
      var loaded = result.filter(
        (item) =>
          !PersonMovieTeamsIdSet.has(getIDValue.PersonMovieTeams?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setPersonMovieTeamsRecords(newOptions.slice(0, autocompleteLength));
    setPersonMovieTeamsLoading(false);
  };
  React.useEffect(() => {
    fetchPersonMovieTeamsRecords("");
  }, []);
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          director: director ?? null,
          operator: operator ?? null,
          scenario: scenario ?? null,
          editor: editor ?? null,
          actors: actors ?? null,
          costumes: costumes ?? null,
          makeup: makeup ?? null,
          executive_producer: executive_producer ?? null,
          producer: producer ?? null,
          producer_org: producer_org ?? null,
          PersonMovieTeams: PersonMovieTeams ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(
                    fieldName,
                    item,
                    getDisplayValue[fieldName]
                  )
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(
                fieldName,
                modelFields[fieldName],
                getDisplayValue[fieldName]
              )
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          const promises = [];
          const personMovieTeamsToLink = [];
          const personMovieTeamsToUnLink = [];
          const personMovieTeamsSet = new Set();
          const linkedPersonMovieTeamsSet = new Set();
          PersonMovieTeams.forEach((r) =>
            personMovieTeamsSet.add(getIDValue.PersonMovieTeams?.(r))
          );
          linkedPersonMovieTeams.forEach((r) =>
            linkedPersonMovieTeamsSet.add(getIDValue.PersonMovieTeams?.(r))
          );
          linkedPersonMovieTeams.forEach((r) => {
            if (!personMovieTeamsSet.has(getIDValue.PersonMovieTeams?.(r))) {
              personMovieTeamsToUnLink.push(r);
            }
          });
          PersonMovieTeams.forEach((r) => {
            if (
              !linkedPersonMovieTeamsSet.has(getIDValue.PersonMovieTeams?.(r))
            ) {
              personMovieTeamsToLink.push(r);
            }
          });
          personMovieTeamsToUnLink.forEach((original) => {
            if (!canUnlinkPersonMovieTeams) {
              throw Error(
                `PersonMovieTeam ${original.id} cannot be unlinked from MovieTeam because undefined is a required field.`
              );
            }
            promises.push(
              API.graphql({
                query: updatePersonMovieTeam.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                  },
                },
              })
            );
          });
          personMovieTeamsToLink.forEach((original) => {
            promises.push(
              API.graphql({
                query: updatePersonMovieTeam.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                  },
                },
              })
            );
          });
          const modelFieldsToSave = {
            director: modelFields.director ?? null,
            operator: modelFields.operator ?? null,
            scenario: modelFields.scenario ?? null,
            editor: modelFields.editor ?? null,
            actors: modelFields.actors ?? null,
            costumes: modelFields.costumes ?? null,
            makeup: modelFields.makeup ?? null,
            executive_producer: modelFields.executive_producer ?? null,
            producer: modelFields.producer ?? null,
            producer_org: modelFields.producer_org ?? null,
          };
          promises.push(
            API.graphql({
              query: updateMovieTeam.replaceAll("__typename", ""),
              variables: {
                input: {
                  id: movieTeamRecord.id,
                  ...modelFieldsToSave,
                },
              },
            })
          );
          await Promise.all(promises);
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "MovieTeamUpdateForm")}
      {...rest}
    >
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              director: values,
              operator,
              scenario,
              editor,
              actors,
              costumes,
              makeup,
              executive_producer,
              producer,
              producer_org,
              PersonMovieTeams,
            };
            const result = onChange(modelFields);
            values = result?.director ?? values;
          }
          setDirector(values);
          setCurrentDirectorValue("");
        }}
        currentFieldValue={currentDirectorValue}
        label={"Director"}
        items={director}
        hasError={errors?.director?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("director", currentDirectorValue)
        }
        errorMessage={errors?.director?.errorMessage}
        setFieldValue={setCurrentDirectorValue}
        inputFieldRef={directorRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Director"
          isRequired={false}
          isReadOnly={false}
          value={currentDirectorValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.director?.hasError) {
              runValidationTasks("director", value);
            }
            setCurrentDirectorValue(value);
          }}
          onBlur={() => runValidationTasks("director", currentDirectorValue)}
          errorMessage={errors.director?.errorMessage}
          hasError={errors.director?.hasError}
          ref={directorRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "director")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              director,
              operator: values,
              scenario,
              editor,
              actors,
              costumes,
              makeup,
              executive_producer,
              producer,
              producer_org,
              PersonMovieTeams,
            };
            const result = onChange(modelFields);
            values = result?.operator ?? values;
          }
          setOperator(values);
          setCurrentOperatorValue("");
        }}
        currentFieldValue={currentOperatorValue}
        label={"Operator"}
        items={operator}
        hasError={errors?.operator?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("operator", currentOperatorValue)
        }
        errorMessage={errors?.operator?.errorMessage}
        setFieldValue={setCurrentOperatorValue}
        inputFieldRef={operatorRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Operator"
          isRequired={false}
          isReadOnly={false}
          value={currentOperatorValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.operator?.hasError) {
              runValidationTasks("operator", value);
            }
            setCurrentOperatorValue(value);
          }}
          onBlur={() => runValidationTasks("operator", currentOperatorValue)}
          errorMessage={errors.operator?.errorMessage}
          hasError={errors.operator?.hasError}
          ref={operatorRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "operator")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              director,
              operator,
              scenario: values,
              editor,
              actors,
              costumes,
              makeup,
              executive_producer,
              producer,
              producer_org,
              PersonMovieTeams,
            };
            const result = onChange(modelFields);
            values = result?.scenario ?? values;
          }
          setScenario(values);
          setCurrentScenarioValue("");
        }}
        currentFieldValue={currentScenarioValue}
        label={"Scenario"}
        items={scenario}
        hasError={errors?.scenario?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("scenario", currentScenarioValue)
        }
        errorMessage={errors?.scenario?.errorMessage}
        setFieldValue={setCurrentScenarioValue}
        inputFieldRef={scenarioRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Scenario"
          isRequired={false}
          isReadOnly={false}
          value={currentScenarioValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.scenario?.hasError) {
              runValidationTasks("scenario", value);
            }
            setCurrentScenarioValue(value);
          }}
          onBlur={() => runValidationTasks("scenario", currentScenarioValue)}
          errorMessage={errors.scenario?.errorMessage}
          hasError={errors.scenario?.hasError}
          ref={scenarioRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "scenario")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              director,
              operator,
              scenario,
              editor: values,
              actors,
              costumes,
              makeup,
              executive_producer,
              producer,
              producer_org,
              PersonMovieTeams,
            };
            const result = onChange(modelFields);
            values = result?.editor ?? values;
          }
          setEditor(values);
          setCurrentEditorValue("");
        }}
        currentFieldValue={currentEditorValue}
        label={"Editor"}
        items={editor}
        hasError={errors?.editor?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("editor", currentEditorValue)
        }
        errorMessage={errors?.editor?.errorMessage}
        setFieldValue={setCurrentEditorValue}
        inputFieldRef={editorRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Editor"
          isRequired={false}
          isReadOnly={false}
          value={currentEditorValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.editor?.hasError) {
              runValidationTasks("editor", value);
            }
            setCurrentEditorValue(value);
          }}
          onBlur={() => runValidationTasks("editor", currentEditorValue)}
          errorMessage={errors.editor?.errorMessage}
          hasError={errors.editor?.hasError}
          ref={editorRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "editor")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              director,
              operator,
              scenario,
              editor,
              actors: values,
              costumes,
              makeup,
              executive_producer,
              producer,
              producer_org,
              PersonMovieTeams,
            };
            const result = onChange(modelFields);
            values = result?.actors ?? values;
          }
          setActors(values);
          setCurrentActorsValue("");
        }}
        currentFieldValue={currentActorsValue}
        label={"Actors"}
        items={actors}
        hasError={errors?.actors?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("actors", currentActorsValue)
        }
        errorMessage={errors?.actors?.errorMessage}
        setFieldValue={setCurrentActorsValue}
        inputFieldRef={actorsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Actors"
          isRequired={false}
          isReadOnly={false}
          value={currentActorsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.actors?.hasError) {
              runValidationTasks("actors", value);
            }
            setCurrentActorsValue(value);
          }}
          onBlur={() => runValidationTasks("actors", currentActorsValue)}
          errorMessage={errors.actors?.errorMessage}
          hasError={errors.actors?.hasError}
          ref={actorsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "actors")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              director,
              operator,
              scenario,
              editor,
              actors,
              costumes: values,
              makeup,
              executive_producer,
              producer,
              producer_org,
              PersonMovieTeams,
            };
            const result = onChange(modelFields);
            values = result?.costumes ?? values;
          }
          setCostumes(values);
          setCurrentCostumesValue("");
        }}
        currentFieldValue={currentCostumesValue}
        label={"Costumes"}
        items={costumes}
        hasError={errors?.costumes?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("costumes", currentCostumesValue)
        }
        errorMessage={errors?.costumes?.errorMessage}
        setFieldValue={setCurrentCostumesValue}
        inputFieldRef={costumesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Costumes"
          isRequired={false}
          isReadOnly={false}
          value={currentCostumesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.costumes?.hasError) {
              runValidationTasks("costumes", value);
            }
            setCurrentCostumesValue(value);
          }}
          onBlur={() => runValidationTasks("costumes", currentCostumesValue)}
          errorMessage={errors.costumes?.errorMessage}
          hasError={errors.costumes?.hasError}
          ref={costumesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "costumes")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              director,
              operator,
              scenario,
              editor,
              actors,
              costumes,
              makeup: values,
              executive_producer,
              producer,
              producer_org,
              PersonMovieTeams,
            };
            const result = onChange(modelFields);
            values = result?.makeup ?? values;
          }
          setMakeup(values);
          setCurrentMakeupValue("");
        }}
        currentFieldValue={currentMakeupValue}
        label={"Makeup"}
        items={makeup}
        hasError={errors?.makeup?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("makeup", currentMakeupValue)
        }
        errorMessage={errors?.makeup?.errorMessage}
        setFieldValue={setCurrentMakeupValue}
        inputFieldRef={makeupRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Makeup"
          isRequired={false}
          isReadOnly={false}
          value={currentMakeupValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.makeup?.hasError) {
              runValidationTasks("makeup", value);
            }
            setCurrentMakeupValue(value);
          }}
          onBlur={() => runValidationTasks("makeup", currentMakeupValue)}
          errorMessage={errors.makeup?.errorMessage}
          hasError={errors.makeup?.hasError}
          ref={makeupRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "makeup")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              director,
              operator,
              scenario,
              editor,
              actors,
              costumes,
              makeup,
              executive_producer: values,
              producer,
              producer_org,
              PersonMovieTeams,
            };
            const result = onChange(modelFields);
            values = result?.executive_producer ?? values;
          }
          setExecutive_producer(values);
          setCurrentExecutive_producerValue("");
        }}
        currentFieldValue={currentExecutive_producerValue}
        label={"Executive producer"}
        items={executive_producer}
        hasError={errors?.executive_producer?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "executive_producer",
            currentExecutive_producerValue
          )
        }
        errorMessage={errors?.executive_producer?.errorMessage}
        setFieldValue={setCurrentExecutive_producerValue}
        inputFieldRef={executive_producerRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Executive producer"
          isRequired={false}
          isReadOnly={false}
          value={currentExecutive_producerValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.executive_producer?.hasError) {
              runValidationTasks("executive_producer", value);
            }
            setCurrentExecutive_producerValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "executive_producer",
              currentExecutive_producerValue
            )
          }
          errorMessage={errors.executive_producer?.errorMessage}
          hasError={errors.executive_producer?.hasError}
          ref={executive_producerRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "executive_producer")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              director,
              operator,
              scenario,
              editor,
              actors,
              costumes,
              makeup,
              executive_producer,
              producer: values,
              producer_org,
              PersonMovieTeams,
            };
            const result = onChange(modelFields);
            values = result?.producer ?? values;
          }
          setProducer(values);
          setCurrentProducerValue("");
        }}
        currentFieldValue={currentProducerValue}
        label={"Producer"}
        items={producer}
        hasError={errors?.producer?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("producer", currentProducerValue)
        }
        errorMessage={errors?.producer?.errorMessage}
        setFieldValue={setCurrentProducerValue}
        inputFieldRef={producerRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Producer"
          isRequired={false}
          isReadOnly={false}
          value={currentProducerValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.producer?.hasError) {
              runValidationTasks("producer", value);
            }
            setCurrentProducerValue(value);
          }}
          onBlur={() => runValidationTasks("producer", currentProducerValue)}
          errorMessage={errors.producer?.errorMessage}
          hasError={errors.producer?.hasError}
          ref={producerRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "producer")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              director,
              operator,
              scenario,
              editor,
              actors,
              costumes,
              makeup,
              executive_producer,
              producer,
              producer_org: values,
              PersonMovieTeams,
            };
            const result = onChange(modelFields);
            values = result?.producer_org ?? values;
          }
          setProducer_org(values);
          setCurrentProducer_orgValue("");
        }}
        currentFieldValue={currentProducer_orgValue}
        label={"Producer org"}
        items={producer_org}
        hasError={errors?.producer_org?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("producer_org", currentProducer_orgValue)
        }
        errorMessage={errors?.producer_org?.errorMessage}
        setFieldValue={setCurrentProducer_orgValue}
        inputFieldRef={producer_orgRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Producer org"
          isRequired={false}
          isReadOnly={false}
          value={currentProducer_orgValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.producer_org?.hasError) {
              runValidationTasks("producer_org", value);
            }
            setCurrentProducer_orgValue(value);
          }}
          onBlur={() =>
            runValidationTasks("producer_org", currentProducer_orgValue)
          }
          errorMessage={errors.producer_org?.errorMessage}
          hasError={errors.producer_org?.hasError}
          ref={producer_orgRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "producer_org")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              director,
              operator,
              scenario,
              editor,
              actors,
              costumes,
              makeup,
              executive_producer,
              producer,
              producer_org,
              PersonMovieTeams: values,
            };
            const result = onChange(modelFields);
            values = result?.PersonMovieTeams ?? values;
          }
          setPersonMovieTeams(values);
          setCurrentPersonMovieTeamsValue(undefined);
          setCurrentPersonMovieTeamsDisplayValue("");
        }}
        currentFieldValue={currentPersonMovieTeamsValue}
        label={"Person movie teams"}
        items={PersonMovieTeams}
        hasError={errors?.PersonMovieTeams?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "PersonMovieTeams",
            currentPersonMovieTeamsValue
          )
        }
        errorMessage={errors?.PersonMovieTeams?.errorMessage}
        getBadgeText={getDisplayValue.PersonMovieTeams}
        setFieldValue={(model) => {
          setCurrentPersonMovieTeamsDisplayValue(
            model ? getDisplayValue.PersonMovieTeams(model) : ""
          );
          setCurrentPersonMovieTeamsValue(model);
        }}
        inputFieldRef={PersonMovieTeamsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Person movie teams"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search PersonMovieTeam"
          value={currentPersonMovieTeamsDisplayValue}
          options={PersonMovieTeamsRecords.map((r) => ({
            id: getIDValue.PersonMovieTeams?.(r),
            label: getDisplayValue.PersonMovieTeams?.(r),
          }))}
          isLoading={PersonMovieTeamsLoading}
          onSelect={({ id, label }) => {
            setCurrentPersonMovieTeamsValue(
              PersonMovieTeamsRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentPersonMovieTeamsDisplayValue(label);
            runValidationTasks("PersonMovieTeams", label);
          }}
          onClear={() => {
            setCurrentPersonMovieTeamsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchPersonMovieTeamsRecords(value);
            if (errors.PersonMovieTeams?.hasError) {
              runValidationTasks("PersonMovieTeams", value);
            }
            setCurrentPersonMovieTeamsDisplayValue(value);
            setCurrentPersonMovieTeamsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "PersonMovieTeams",
              currentPersonMovieTeamsDisplayValue
            )
          }
          errorMessage={errors.PersonMovieTeams?.errorMessage}
          hasError={errors.PersonMovieTeams?.hasError}
          ref={PersonMovieTeamsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "PersonMovieTeams")}
        ></Autocomplete>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || movieTeamModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || movieTeamModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
